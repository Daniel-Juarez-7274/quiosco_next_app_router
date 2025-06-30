'use client'

import { useFormStatus } from "react-dom"
import { completeOrder } from "@/actions/complete-order-action"

type Props = {
    mutate: () => void
}

export const OrderCompleteButton = ({ mutate }: Props) => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            formAction={async (formData) => {
                await completeOrder(formData)
                mutate()

                // Notificar a la página /orders para que se actualice
                const channel = new BroadcastChannel("order-channel")
                channel.postMessage("new-order")
                channel.close()
            }}
            className="flex items-center justify-center gap-4 py-2 w-full text-center text-white 
                font-bold bg-indigo-600 hover:bg-indigo-800 rounded uppercase cursor-pointer 
                disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
            {pending ? "Enviando..." : "Marcar Orden Completada"}
        </button>
    )
}
