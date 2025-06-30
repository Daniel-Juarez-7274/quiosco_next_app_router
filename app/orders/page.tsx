"use client"

import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import { useEffect } from "react";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function OrdersPage() {
    const url = "/orders/api"
    const fetcher = () => fetch(url).then(res => res.json())
    const { data, error, isLoading, mutate } = useSWR<OrderWithProducts[]>(url, fetcher, {
        revalidateOnFocus: false
    })

    useEffect(() => {
        const channel = new BroadcastChannel("order-channel")

        channel.onmessage = (event) => {
            if (event.data === "new-order") {
                mutate()
            }
        }

        return () => channel.close()
    }, [mutate])

    if (isLoading) return <p className="text-center mt-10">Cargando...</p>
    if (error) return <p className="text-center mt-10 text-red-500">Error al cargar órdenes</p>

    if (data) return (
        <>
            <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>

            <Logo />

            {data.length ? (
                <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
                    {data.map(order => (
                        <LatestOrderItem
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className= "text-center my-10">No hay ordenes listas</p>}
        </>
    )
}
