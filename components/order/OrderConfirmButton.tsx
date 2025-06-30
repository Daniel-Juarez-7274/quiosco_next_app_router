'use client'
import { useFormStatus } from "react-dom"

export default function OrderConfirmButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {pending ? "Enviando..." : "Confirmar Pedido"}
        </button>
    )
}
