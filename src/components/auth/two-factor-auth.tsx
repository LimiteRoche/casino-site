import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertCircle } from 'lucide-react'

export default function TwoFactorAuth() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para verificar el código 2FA
    if (code === '123456') { // Ejemplo de verificación
      // Redirigir al usuario o mostrar mensaje de éxito
    } else {
      setError('Código incorrecto. Por favor, intenta nuevamente.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">Autenticación de Dos Factores</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium text-gray-200">
              Código de Verificación
            </label>
            <Input
              id="code"
              type="text"
              placeholder="Ingresa el código de 6 dígitos"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>
          {error && (
            <Alert className="bg-red-500/20 border-red-500 text-white">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            Verificar
          </Button>
        </form>
        <div className="mt-8 text-center text-white">
          <p className="text-sm">
            <Shield className="inline-block mr-2 h-4 w-4" />
            Ingresa el código de verificación enviado a tu dispositivo.
          </p>
        </div>
      </motion.div>
    </div>
  )
}