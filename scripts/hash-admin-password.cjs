/**
 * Kullanim: node scripts/hash-admin-password.cjs "GucluBirParola123!"
 * Ciktiyi .env.local dosyaniza ADMIN_PASSWORD_HASH=... olarak ekleyin.
 */
const bcrypt = require('bcryptjs');

const plain = process.argv[2];
if (!plain || plain.length < 12) {
  console.error('En az 12 karakterlik bir parola verin.');
  console.error('Ornek: node scripts/hash-admin-password.cjs "BenimGuvenliParolam42!"');
  process.exit(1);
}

const saltRounds = 12;
const hash = bcrypt.hashSync(plain, saltRounds);
console.log(hash);
