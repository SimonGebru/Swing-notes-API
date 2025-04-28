

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API för hantering av användare (registrering och inloggning)
 */


/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Skapa ett nytt användarkonto
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Användarens e-postadress
 *               password:
 *                 type: string
 *                 description: Användarens lösenord
 *     responses:
 *       201:
 *         description: Användarkonto skapat
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logga in och få en JWT-token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Användarens e-postadress
 *               password:
 *                 type: string
 *                 description: Användarens lösenord
 *     responses:
 *       200:
 *         description: Inloggning lyckades och token returnerades
 *       401:
 *         description: Ogiltiga inloggningsuppgifter
 */
router.post ('/login', login);

module.exports = router;