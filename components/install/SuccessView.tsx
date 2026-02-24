'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepCard } from './StepCard';
import { cn } from '@/lib/utils';
import { playComplete } from '@/hooks/useSoundFX';

interface SuccessViewProps {
  name: string;
  /** Email do admin configurado no wizard */
  email?: string;
  /** Senha configurada (exibir apenas nesta tela; não persistir) */
  password?: string;
  /** URL do app na Vercel (ex.: https://projeto.vercel.app) */
  vercelUrl?: string;
}

/**
 * Sanitiza e extrai o primeiro nome.
 */
function sanitizeFirstName(fullName: string): string {
  const firstName = fullName.trim().split(/\s+/)[0] || '';
  const sanitized = firstName.slice(0, 30).replace(/[<>'"&]/g, '');
  return sanitized || 'Replicante';
}

/**
 * View de sucesso após instalação completa.
 * Tema Blade Runner - "Mais humano que humano"
 */
export function SuccessView({ name, email, password, vercelUrl }: SuccessViewProps) {
  const firstName = sanitizeFirstName(name);

  // Som de conclusão ao montar
  useEffect(() => {
    playComplete();
  }, []);

  const handleGoToDashboard = () => {
    window.location.href = '/login';
  };

  return (
    <StepCard glowColor="cyan">
      <div className="flex flex-col items-center text-center py-8">
        {/* Success icon with glow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn(
            'w-20 h-20 rounded-full',
            'bg-[var(--br-neon-cyan)]/20 border-2 border-[var(--br-neon-cyan)]',
            'flex items-center justify-center',
            'shadow-[0_0_40px_var(--br-neon-cyan)/0.5]'
          )}
        >
          <CheckCircle className="w-10 h-10 text-[var(--br-neon-cyan)]" />
        </motion.div>

        {/* Title - Blade Runner reference */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xl font-mono font-bold text-[var(--br-hologram-white)] uppercase tracking-wide"
        >
          Incubação Completa, {firstName}.
        </motion.h2>

        {/* Subtitle - Tyrell motto */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-2 text-sm text-[var(--br-neon-magenta)] font-mono italic"
        >
          &quot;Mais humano que humano&quot;
        </motion.p>

        {/* Dados de acesso: URL, email, senha */}
        {(vercelUrl || email || password) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 w-full rounded-lg border border-[var(--br-neon-cyan)]/30 bg-[var(--br-void-black)]/60 p-4 text-left font-mono text-sm"
          >
            <p className="mb-2 text-xs uppercase tracking-wider text-[var(--br-dust-gray)]">
              Guarde estes dados
            </p>
            {vercelUrl && (
              <p className="mb-2">
                <span className="text-[var(--br-dust-gray)]">URL do app: </span>
                <a
                  href={vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--br-neon-cyan)] hover:underline"
                >
                  {vercelUrl}
                </a>
              </p>
            )}
            {email && (
              <p className="mb-2">
                <span className="text-[var(--br-dust-gray)]">Email: </span>
                <span className="text-[var(--br-hologram-white)]">{email}</span>
              </p>
            )}
            {password && (
              <p>
                <span className="text-[var(--br-dust-gray)]">Senha: </span>
                <span className="text-[var(--br-hologram-white)] font-mono">{password}</span>
                <span className="ml-2 text-xs text-[var(--br-neon-magenta)]">(guarde em local seguro)</span>
              </p>
            )}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 w-full"
        >
          <Button
            size="lg"
            className={cn(
              'w-full font-mono uppercase tracking-wider',
              'bg-[var(--br-neon-cyan)] hover:bg-[var(--br-neon-cyan)]/80',
              'text-[var(--br-void-black)] font-bold',
              'shadow-[0_0_20px_var(--br-neon-cyan)/0.4]',
              'hover:shadow-[0_0_30px_var(--br-neon-cyan)/0.6]',
              'transition-all duration-200'
            )}
            onClick={handleGoToDashboard}
          >
            Iniciar Operações
          </Button>
        </motion.div>

        {/* Hint - Blade Runner style */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-4 text-xs text-[var(--br-dust-gray)] font-mono"
        >
          Configure a API do WhatsApp em Configurações • Seu baseline foi registrado
        </motion.p>
      </div>
    </StepCard>
  );
}
