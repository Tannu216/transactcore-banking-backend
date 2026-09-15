const { Router} = require('express');
const  authMiddleware  = require('../middleware/auth.Middleware');
const transactionController = require("../controllers/transaction.controller")

const transactionRoutes = Router();

/**
 * - Post/api/transactions/
 * -Create a new transaction
 */

transactionRoutes.post("/" ,authMiddleware.authMiddleware, transactionController.createTransaction)

/**
 * -Post/api/transaction/system/initial-funds
 * -Create initial funds transaction from system user
 */
transactionRoutes.post("/system/initial-funds",authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

module.exports = transactionRoutes;