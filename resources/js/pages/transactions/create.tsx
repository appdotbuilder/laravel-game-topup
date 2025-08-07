import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

interface GameProduct {
    name: string;
    category: string;
}

interface GameItem {
    id: number;
    name: string;
    description: string;
    price: number;
    amount: number;
    currency_type: string;
    game_product: GameProduct;
}

interface PaymentChannel {
    name: string;
    channels: string[];
}

interface PaymentMethods {
    [key: string]: PaymentChannel;
}

interface Props {
    gameItem?: GameItem;
    paymentMethods: PaymentMethods;
    [key: string]: unknown;
}

export default function CreateTransaction({ gameItem, paymentMethods }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        game_item_id: gameItem?.id || 0,
        player_id: '',
        payment_method: '',
        payment_channel: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions');
    };

    const getCurrencyEmoji = (currencyType: string) => {
        switch (currencyType) {
            case 'diamond': return '💎';
            case 'uc': return '🪙';
            case 'crystal': return '✨';
            default: return '💰';
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getPaymentMethodEmoji = (method: string) => {
        switch (method) {
            case 'ewallet': return '📱';
            case 'virtual_account': return '🏦';
            case 'bank_transfer': return '💰';
            default: return '💳';
        }
    };

    if (!gameItem) {
        return (
            <AppShell>
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎮</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Item game tidak ditemukan
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Silakan pilih game dan item yang ingin kamu top-up
                    </p>
                    <Button onClick={() => window.location.href = '/games'}>
                        🎯 Pilih Game
                    </Button>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🛒 Checkout Top-Up
                    </h1>
                    <p className="text-gray-600">
                        Lengkapi data untuk menyelesaikan transaksi top-up kamu
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    📋 Ringkasan Pesanan
                                </h3>
                                
                                <div className="space-y-4">
                                    {/* Game Info */}
                                    <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                        <div className="text-3xl mr-4">
                                            {getCurrencyEmoji(gameItem.currency_type)}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">
                                                {gameItem.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {gameItem.game_product.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Harga Item:</span>
                                            <span className="font-medium">{formatPrice(gameItem.price)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Biaya Admin:</span>
                                            <span className="font-medium text-green-600">GRATIS</span>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span className="text-blue-600">{formatPrice(gameItem.price)}</span>
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <div className="space-y-2 pt-4 border-t">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="text-green-500 mr-2">✓</span>
                                            Proses otomatis & cepat
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="text-green-500 mr-2">✓</span>
                                            Garansi 100% aman
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="text-green-500 mr-2">✓</span>
                                            Support 24/7
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Player ID */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    👤 Data Player
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="player_id" className="block text-sm font-medium text-gray-700 mb-2">
                                            Player ID / User ID
                                        </label>
                                        <input
                                            type="text"
                                            id="player_id"
                                            value={data.player_id}
                                            onChange={(e) => setData('player_id', e.target.value)}
                                            placeholder="Masukkan Player ID kamu"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        {errors.player_id && (
                                            <p className="text-red-600 text-sm mt-2">{errors.player_id}</p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-2">
                                            💡 Pastikan Player ID sudah benar untuk menghindari kesalahan top-up
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    💳 Pilih Metode Pembayaran
                                </h3>
                                
                                <div className="space-y-4">
                                    {Object.entries(paymentMethods).map(([method, details]) => (
                                        <div key={method} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                                            <div className="flex items-center mb-3">
                                                <input
                                                    type="radio"
                                                    id={method}
                                                    name="payment_method"
                                                    value={method}
                                                    checked={data.payment_method === method}
                                                    onChange={(e) => {
                                                        setData('payment_method', e.target.value);
                                                        setData('payment_channel', '');
                                                    }}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <label htmlFor={method} className="ml-3 flex items-center cursor-pointer">
                                                    <span className="text-xl mr-2">
                                                        {getPaymentMethodEmoji(method)}
                                                    </span>
                                                    <span className="font-medium text-gray-900">
                                                        {details.name}
                                                    </span>
                                                </label>
                                            </div>
                                            
                                            {data.payment_method === method && (
                                                <div className="ml-7 space-y-2">
                                                    <p className="text-sm text-gray-600 mb-3">Pilih channel pembayaran:</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {details.channels.map((channel) => (
                                                            <label key={channel} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    name="payment_channel"
                                                                    value={channel}
                                                                    checked={data.payment_channel === channel}
                                                                    onChange={(e) => setData('payment_channel', e.target.value)}
                                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                />
                                                                <span className="ml-2 text-sm font-medium text-gray-700">
                                                                    {channel}
                                                                </span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                {errors.payment_method && (
                                    <p className="text-red-600 text-sm mt-2">{errors.payment_method}</p>
                                )}
                                {errors.payment_channel && (
                                    <p className="text-red-600 text-sm mt-2">{errors.payment_channel}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <Button
                                    type="submit"
                                    disabled={processing || !data.player_id || !data.payment_method || !data.payment_channel}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg py-4"
                                >
                                    {processing ? (
                                        <>🔄 Memproses...</>
                                    ) : (
                                        <>💳 Bayar Sekarang - {formatPrice(gameItem.price)}</>
                                    )}
                                </Button>
                                
                                <p className="text-xs text-gray-500 text-center mt-3">
                                    Dengan melanjutkan, kamu menyetujui syarat dan ketentuan yang berlaku
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}