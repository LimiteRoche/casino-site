import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react'

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para cambiar la contraseña
    // Por ahora, simularemos un cambio exitoso
    setIsSuccess(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">Cambiar Contraseña</h1>
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium text-gray-200">
                Contraseña Actual
              </label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-200">
                Nueva Contraseña
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                Confirmar Nueva Contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              Cambiar Contraseña
            </Button>
          </form>
        ) : (
          <Alert className="bg-green-500/20 border-green-500 text-white">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Contraseña Cambiada</AlertTitle>
            <AlertDescription>
              Tu contraseña ha sido cambiada exitosamente.
            </AlertDescription>
          </Alert>
        )}
        <div className="mt-8 text-center text-white">
          <p className="text-sm">
            <Lock className="inline-block mr-2 h-4 w-4" />
            Asegúrate de usar una contraseña fuerte y única.
          </p>
        </div>
      </motion.div>
    </div>
  )
}