import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { OrderCompleteButton } from "./OrderCompleteButton"

type OrderCardProps = {
    order: OrderWithProducts
    mutate: () => void
}

export default function OrderCard({ order, mutate }: OrderCardProps) {
    return (
        <section className="mt-5 rounded-lg bg-gray-50 p-6 space-y-4">
            <p className="text-2xl font-medium text-gray-900">Cliente: {order.name}</p>
            <p className="text-lg font-medium text-gray-900">Productos:</p>

            <ul className="space-y-2">
                {order.orderProducts.map(product => (
                    <li key={product.productId} className="text-sm text-gray-800">
                        <span className="font-bold">({product.quantity})</span> {product.product.name}
                    </li>
                ))}
            </ul>

            <p className="text-right font-bold text-lg text-indigo-800">
                Total: {formatCurrency(order.total)}
            </p>

            <form>
                <input type="hidden" name="order_id" value={order.id} />
                <OrderCompleteButton mutate={mutate} />
            </form>
        </section>
    )
}
