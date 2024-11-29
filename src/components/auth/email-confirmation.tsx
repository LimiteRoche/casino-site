import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle } from 'lucide-react'

export default function EmailConfirmation() {
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null)

  useEffect(() => {
    // Aquí iría la lógica para verificar el token de confirmación
    // Por ahora, simularemos una confirmación exitosa después de 2 segundos
    const timer = setTimeout(() => {
      setIsConfirmed(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">Confirmación de Cuenta</h1>
        {isConfirmed === null ? (
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4">Verificando tu cuenta...</p>
          </div>
        ) : isConfirmed ? (
          <Alert className="bg-green-500/20 border-green-500 text-white">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Cuenta Confirmada</AlertTitle>
            <AlertDescription>
              Tu cuenta ha sido confirmada exitosamente. Ya puedes iniciar sesión.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-red-500/20 border-red-500 text-white">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error de Confirmación</AlertTitle>
            <AlertDescription>
              No se pudo confirmar tu cuenta. Por favor, intenta nuevamente o contacta a soporte.
            </AlertDescription>
          </Alert>
        )}
        <div className="mt-8 text-center">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Ir al Inicio de Sesión
          </Button>
        </div>
      </motion.div>
    </div>
  )
}