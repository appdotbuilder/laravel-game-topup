import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface GameItem {
    id: number;
    name: string;
    description: string;
    price: number;
    amount: number;
    currency_type: string;
}

interface Game {
    id: number;
    name: string;
    category: string;
    description: string;
    game_items: GameItem[];
}

interface Props {
    game: Game;
    [key: string]: unknown;
}

export default function GameShow({ game }: Props) {
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

    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'MOBA': return '⚔️';
            case 'Battle Royale': return '🔫';
            case 'RPG': return '✨';
            case 'Strategy': return '🏰';
            case 'FPS': return '🎯';
            default: return '🎮';
        }
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500">
                    <Link href="/games" className="hover:text-gray-700">Games</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{game.name}</span>
                </div>

                {/* Game Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="text-4xl mr-4">{getCategoryEmoji(game.category)}</div>
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
                                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                                        {game.category}
                                    </span>
                                </div>
                            </div>
                            <p className="text-blue-100 text-lg max-w-2xl">
                                {game.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Top-Up Packages */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            💎 Pilih Paket Top-Up
                        </h2>
                        <p className="text-gray-600">
                            Pilih paket yang sesuai dengan kebutuhan gaming kamu
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {game.game_items.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                                    index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''
                                }`}
                            >
                                {/* Popular badge */}
                                {index === 1 && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                                        🔥 POPULER
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Package Header */}
                                    <div className="text-center mb-6">
                                        <div className="text-4xl mb-3">
                                            {getCurrencyEmoji(item.currency_type)}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">
                                            {formatPrice(item.price)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Per {item.amount} {item.currency_type}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6">
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

                                    {/* CTA Button */}
                                    <Link href={`/transactions/create?game_item_id=${item.id}`}>
                                        <Button 
                                            className={`w-full ${
                                                index === 1 
                                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                                            }`}
                                        >
                                            {index === 1 ? '🔥 Beli Sekarang' : '🎯 Pilih Paket'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How to Top-up */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        📋 Cara Top-Up {game.name}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                                1
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Pilih Paket</h4>
                            <p className="text-sm text-gray-600">Pilih nominal yang diinginkan</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                                2
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Masukan Player ID</h4>
                            <p className="text-sm text-gray-600">Input ID game kamu dengan benar</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                                3
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Pilih Pembayaran</h4>
                            <p className="text-sm text-gray-600">Bayar dengan metode favorit kamu</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                                ✓
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Selesai!</h4>
                            <p className="text-sm text-gray-600">Diamonds langsung masuk ke akun</p>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        💳 Metode Pembayaran Tersedia
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                            <div className="text-3xl mb-3">📱</div>
                            <h4 className="font-semibold text-gray-900 mb-2">E-Wallet</h4>
                            <p className="text-sm text-gray-600 mb-3">OVO, DANA, GoPay, ShopeePay</p>
                            <div className="text-xs text-blue-600 font-medium">✨ Paling Populer</div>
                        </div>
                        
                        <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                            <div className="text-3xl mb-3">🏦</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Virtual Account</h4>
                            <p className="text-sm text-gray-600 mb-3">BCA, Mandiri, BNI, BRI VA</p>
                            <div className="text-xs text-green-600 font-medium">🔒 Paling Aman</div>
                        </div>
                        
                        <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                            <div className="text-3xl mb-3">💰</div>
                            <h4 className="font-semibold text-gray-900 mb-2">Transfer Bank</h4>
                            <p className="text-sm text-gray-600 mb-3">Semua bank di Indonesia</p>
                            <div className="text-xs text-purple-600 font-medium">⚡ Paling Cepat</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}