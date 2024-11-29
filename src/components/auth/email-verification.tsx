import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, CheckCircle } from 'lucide-react'

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para verificar el código
    // Por ahora, simularemos una verificación exitosa
    setIsVerified(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">Verificación de Correo Electrónico</h1>
        {!isVerified ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="verificationCode" className="text-sm font-medium text-gray-200">
                Código de Verificación
              </label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="Ingresa el código de 6 dígitos"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              Verificar
            </Button>
          </form>
        ) : (
          <Alert className="bg-green-500/20 border-green-500 text-white">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Correo Verificado</AlertTitle>
            <AlertDescription>
              Tu correo electrónico ha sido verificado exitosamente.
            </AlertDescription>
          </Alert>
        )}
        <div className="mt-8 text-center text-white">
          <p className="text-sm">
            <Mail className="inline-block mr-2 h-4 w-4" />
            Se ha enviado un código de verificación a tu correo electrónico.
          </p>
        </div>
      </motion.div>
    </div>
  )
}