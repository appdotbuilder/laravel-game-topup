import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface GameItem {
    id: number;
    name: string;
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
    games: Game[];
    [key: string]: unknown;
}

export default function GamesIndex({ games }: Props) {
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

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🎮 Pilih Game Favoritmu
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Top-up untuk game populer dengan harga terbaik dan proses yang super cepat
                    </p>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {games.map((game) => (
                        <div key={game.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Game Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                                            {game.category}
                                        </span>
                                    </div>
                                    <div className="text-4xl opacity-80">
                                        {game.category === 'MOBA' && '⚔️'}
                                        {game.category === 'Battle Royale' && '🔫'}
                                        {game.category === 'RPG' && '✨'}
                                        {game.category === 'Strategy' && '🏰'}
                                    </div>
                                </div>
                            </div>

                            {/* Game Items */}
                            <div className="p-6">
                                <p className="text-gray-600 mb-6">{game.description}</p>
                                
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    💰 Paket Top-Up Tersedia:
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {game.game_items.slice(0, 4).map((item) => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {getCurrencyEmoji(item.currency_type)} {item.amount}
                                                </span>
                                            </div>
                                            <div className="text-lg font-bold text-blue-600">
                                                {formatPrice(item.price)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <Link href={`/games/${game.id}`} className="flex-1">
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                            🎯 Pilih Paket
                                        </Button>
                                    </Link>
                                    <Link href={`/transactions/create?game_item_id=${game.game_items[0]?.id}`}>
                                        <Button variant="outline" className="px-6">
                                            ⚡ Quick Buy
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {games.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🎮</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Belum ada game tersedia
                        </h3>
                        <p className="text-gray-600">
                            Game akan segera ditambahkan. Stay tuned!
                        </p>
                    </div>
                )}

                {/* Info Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        🔥 Mengapa Pilih GameTopUp Pro?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-2xl mb-2">⚡</div>
                            <h4 className="font-semibold text-gray-900 mb-1">Proses Cepat</h4>
                            <p className="text-sm text-gray-600">Top-up otomatis dalam hitungan detik</p>
                        </div>
                        <div>
                            <div className="text-2xl mb-2">🔐</div>
                            <h4 className="font-semibold text-gray-900 mb-1">100% Aman</h4>
                            <p className="text-sm text-gray-600">Sistem keamanan berlapis</p>
                        </div>
                        <div>
                            <div className="text-2xl mb-2">💎</div>
                            <h4 className="font-semibold text-gray-900 mb-1">Harga Terbaik</h4>
                            <p className="text-sm text-gray-600">Dijamin termurah se-Indonesia</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}