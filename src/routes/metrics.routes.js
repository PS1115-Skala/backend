const { Router } = require('express');
const router = Router();

const { validateData } = require('../middleware/validations/validationsHandler')
const { metricsSchema } = require('../middleware/validations/schemas/metricsSchema')
const MetricsController = require('../controllers/metric.controller');
const MetricsReportController = require('../controllers/metricsReport.controller');
const auth = require('../middleware/authHandler');

const metricController = new MetricsController;
const metricsReportController = new MetricsReportController;

/* Obtener el numero de estudiantes que ha usado la sala hasta la actualidad */
router.get('/metrics/usodesala/:RoomId', auth.isLabF, metricController.roomUsage);

/* Descargar reporte de metrics en CSV */
router.get('/metrics/reservas/csv', validateData(metricsSchema, 'query'), metricsReportController.getSummaryMetricsCsv);

/* Metricas standard del usuario LabF */
router.get('/metrics/reservas', auth.isLabF, validateData(metricsSchema, 'query'), metricController.getStandardMetrics);

/* Obtener el numero de reservas que ha tenido la sala desde una fecha de inicio hasta una fecha final */
router.get('/metrics/totalreservas', auth.isLabF, metricController.getReservationsQuantity);

/* Obtener la variaciones de los items desde un trimestre a otro especificado */
router.get('/metrics/variacionitems/:RoomId', auth.isLabF, metricController.getItemsVarations);

module.exports = router;