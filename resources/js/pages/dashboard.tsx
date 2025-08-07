import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppShell>
            <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl font-bold mb-2">
                            🎮 Selamat Datang di GameTopUp Pro!
                        </h1>
                        <p className="text-blue-100 text-lg mb-6">
                            Platform top-up game terpercaya dengan proses cepat dan aman. 
                            Mulai top-up game favorit kamu sekarang juga!
                        </p>
                        <div className="flex gap-4">
                            <Link href="/games">
                                <Button className="bg-white text-blue-600 hover:bg-gray-50 font-semibold">
                                    🚀 Mulai Top-Up
                                </Button>
                            </Link>
                            <Link href="/transactions">
                                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                                    📜 Lihat Transaksi
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/games" className="group">
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">🎮</div>
                                <div className="text-blue-600 group-hover:text-blue-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Games</h3>
                            <p className="text-gray-600">
                                Pilih dari berbagai game populer dan mulai top-up sekarang
                            </p>
                        </div>
                    </Link>

                    <Link href="/transactions" className="group">
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">📜</div>
                                <div className="text-green-600 group-hover:text-green-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Riwayat Transaksi</h3>
                            <p className="text-gray-600">
                                Lihat dan kelola semua transaksi top-up kamu
                            </p>
                        </div>
                    </Link>

                    <Link href="/transactions/create" className="group">
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">⚡</div>
                                <div className="text-purple-600 group-hover:text-purple-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Top-Up</h3>
                            <p className="text-gray-600">
                                Top-up cepat untuk game yang sudah kamu pilih
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Popular Games */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            🔥 Game Populer
                        </h2>
                        <Link href="/games">
                            <Button variant="outline" size="sm">
                                Lihat Semua
                            </Button>
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Mobile Legends', category: 'MOBA', emoji: '⚔️', color: 'bg-blue-500' },
                            { name: 'PUBG Mobile', category: 'Battle Royale', emoji: '🔫', color: 'bg-orange-500' },
                            { name: 'Free Fire', category: 'Battle Royale', emoji: '🔥', color: 'bg-red-500' },
                            { name: 'Genshin Impact', category: 'RPG', emoji: '✨', color: 'bg-purple-500' },
                        ].map((game, index) => (
                            <div key={index} className="group cursor-pointer">
                                <Link href="/games">
                                    <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors group-hover:scale-105 transform duration-200">
                                        <div className={`w-12 h-12 ${game.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                            <span className="text-white text-xl">{game.emoji}</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 text-center text-sm mb-1">
                                            {game.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 text-center">
                                            {game.category}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Payment Methods */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            💳 Metode Pembayaran
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-2xl mr-3">📱</div>
                                <div>
                                    <div className="font-medium text-gray-900">E-Wallet</div>
                                    <div className="text-sm text-gray-600">OVO, DANA, GoPay, ShopeePay</div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                <div className="text-2xl mr-3">🏦</div>
                                <div>
                                    <div className="font-medium text-gray-900">Virtual Account</div>
                                    <div className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                <div className="text-2xl mr-3">💰</div>
                                <div>
                                    <div className="font-medium text-gray-900">Bank Transfer</div>
                                    <div className="text-sm text-gray-600">Semua bank di Indonesia</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            ✨ Mengapa Pilih Kami?
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="text-green-500 mr-3">✓</div>
                                <span className="text-gray-700">Proses otomatis dalam hitungan detik</span>
                            </div>
                            <div className="flex items-center">
                                <div className="text-green-500 mr-3">✓</div>
                                <span className="text-gray-700">Sistem keamanan berlapis</span>
                            </div>
                            <div className="flex items-center">
                                <div className="text-green-500 mr-3">✓</div>
                                <span className="text-gray-700">Customer support 24/7</span>
                            </div>
                            <div className="flex items-center">
                                <div className="text-green-500 mr-3">✓</div>
                                <span className="text-gray-700">Harga terbaik dan terpercaya</span>
                            </div>
                            <div className="flex items-center">
                                <div className="text-green-500 mr-3">✓</div>
                                <span className="text-gray-700">Bonus dan reward menarik</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">
                        🚀 Siap untuk Mulai Gaming?
                    </h3>
                    <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                        Jangan sampai kehabisan diamonds atau UC! Top-up sekarang dan nikmati bermain tanpa batas.
                    </p>
                    <Link href="/games">
                        <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50 font-semibold px-8">
                            🎯 Mulai Top-Up Sekarang
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}