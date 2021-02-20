const moment = require('moment');
const RoomsService = require('../../services/rooms.service');
const TrimestersService = require('../../services/trimesters.service');
const ReservationRequestService = require('../../services/reservationRequest.service');

const reservationRequestService = new ReservationRequestService();
const trimestersService = new TrimestersService();
const roomsService = new RoomsService();

/**
 * Daemon to auto-update trimesters.
 *
 * Gets the current trimester and gets its end date then compares it to the current date.
 * If when verifying the current date is greater than the completion date, the new date of the next trimester is chosen.
 *
 * The ranges (I think) are:
 * - If it ends between Feb-Apr, create Apr-Jul.
 * - If it ends between Jun-Aug, create Sep-Dec.
 * - If it ends between Sep-Jan, create Jan-Mar.
 *
 * @returns {Promise<void>}
 */
const generateNextTrimester = async () => {
	const temp = await trimestersService.getActualTrim();
	const lasTrim = temp.rows[0].finish.toISOString();
	if (moment().isAfter(moment(lasTrim).add(1, 'day'))) {
		const lasTrimMonth = moment(lasTrim).month();
		const lasTrimYear = moment(lasTrim).year();
		// March, April, May.
		if (2 <= lasTrimMonth && lasTrimMonth <= 4) {
			await trimestersService.createTrim(
				'ABR-JUL' + lasTrimYear,
				moment(lasTrim)
					.add(3, 'day')
					.toISOString(),
				moment(lasTrim)
					.add(3, 'month')
					.toISOString()
			);
		}
		// June, July.
		else if (5 <= lasTrimMonth && lasTrimMonth <= 6) {
			await trimestersService.createTrim(
				'JUL-AGO' + lasTrimYear,
				moment(lasTrim)
					.add(3, 'day')
					.toISOString(),
				moment(lasTrim)
					.add(10, 'week')
					.toISOString()
			);
		}
		// September, October.
		else if (8 <= lasTrimMonth && lasTrimMonth <= 9) {
			await trimestersService.createTrim(
				'SEP-DIC' + lasTrimYear,
				moment(lasTrim)
					.add(3, 'day')
					.toISOString(),
				moment(lasTrim)
					.add(3, 'month')
					.toISOString()
			);
		}
		// December.
		else if (11 <= lasTrimMonth) {
			await trimestersService.createTrim(
				'ENE-MAR' +
          moment(lasTrim)
          	.add(1, 'year')
          	.year(),
				moment(lasTrim)
					.add(3, 'day')
					.toISOString(),
				moment(lasTrim)
					.add(4, 'month')
					.toISOString()
			);
		}
		// January, February
		else if (lasTrimMonth <= 1) {
			await trimestersService.createTrim(
				'ENE-MAR' + lasTrimYear,
				moment(lasTrim)
					.add(3, 'day')
					.toISOString(),
				moment(lasTrim)
					.add(3, 'month')
					.toISOString()
			);
		}
		keepLabItemsFromPrevTrim(temp);
		rejectPendingReqFromThePrevTrim(temp);
	}
};

/**
 * @param {Array<any>} pastTrim Reference of the last trimester.
 * @returns {Promise<void>}
 */
const keepLabItemsFromPrevTrim = async (pastTrim) => {
	const Salas = await roomsService.getSalasActivas();
	const idSalas = Salas.rows;
	for (let elem of idSalas) {
		const itemsSala = await roomsService.getSalaItemsByTrim(
			elem.id,
			pastTrim.rows[0].id
		);
		const salaItems = itemsSala.rows;
		for (let item of salaItems) {
			await roomsService.createSalaItem(elem.id, item.id, item.quantity);
		}
	}
};

/**
 * @param {Array<any>} pastTrim Reference of the last trimester.
 * @returns {Promise<void>}
 */
const rejectPendingReqFromThePrevTrim = async (pastTrim) => {
	const reservation_request_id = await reservationRequestService.getAllPendingRequestOfLastTrim(
		pastTrim.rows[0].id
	);
	const idRR = reservation_request_id.rows;
	for (let elem of idRR) {
		await reservationRequestService.updateRequest(
			elem.id,
			'Trimestre Solicitado Termino',
			'R'
		);
	}
};

module.exports = generateNextTrimester;
