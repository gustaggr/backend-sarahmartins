import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from './emailService';
import { prisma } from '../../utils/prisma';

export async function requestPasswordResetLink(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('E-mail não encontrado.');

  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos

  await prisma.passwordResetToken.deleteMany({ where: { email } });

  await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });

const frontendUrl = process.env.FRONTEND_URL as string;
const link = `${frontendUrl}/trocar-senha?token=${token}`;

  await sendPasswordResetEmail(email, link);
}

export async function resetPasswordWithToken(token: string, newPassword: string) {
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record) throw new Error('Token inválido.');
  if (record.expiresAt < new Date()) throw new Error('Token expirado.');

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: record.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } });
}
