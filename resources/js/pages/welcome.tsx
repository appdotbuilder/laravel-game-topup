import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🎮</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                GameTopUp Pro
                            </span>
                        </div>
                        
                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                                        Dashboard
                                    </Link>
                                    <div className="text-sm text-gray-500">
                                        Welcome, {auth.user.name}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/login">
                                        <Button variant="outline" size="sm">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
                            🚀 Top-up game favorit kamu dengan mudah!
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                GameTopUp Pro
                            </span>
                            <br />
                            <span className="text-gray-800">Platform Terpercaya</span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Top-up diamonds, UC, genesis crystals dan in-game currency lainnya dengan cepat, aman, dan terpercaya. 
                            Dapatkan bonus menarik setiap pembelian! 💎
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            {auth.user ? (
                                <Link href="/games">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4">
                                        🎯 Mulai Top-Up Sekarang
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4">
                                            🚀 Daftar Gratis
                                        </Button>
                                    </Link>
                                    <Link href="/games">
                                        <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                                            👀 Lihat Games
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-1/3 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-60 animate-pulse delay-500"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ✨ Mengapa Pilih GameTopUp Pro?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Pengalaman top-up terbaik dengan berbagai keunggulan yang tidak akan kamu temukan di tempat lain
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Proses Super Cepat</h3>
                            <p className="text-gray-600">
                                Top-up otomatis dalam hitungan detik. Tidak perlu menunggu lama!
                            </p>
                        </div>
                        
                        <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">🔐</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Aman</h3>
                            <p className="text-gray-600">
                                Sistem keamanan berlapis dengan enkripsi tingkat bank
                            </p>
                        </div>
                        
                        <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">💳</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Banyak Metode Bayar</h3>
                            <p className="text-gray-600">
                                E-wallet, Virtual Account, Transfer Bank - semua tersedia!
                            </p>
                        </div>
                        
                        <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl">🎁</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Bonus Menarik</h3>
                            <p className="text-gray-600">
                                Dapatkan bonus diamonds dan rewards eksklusif setiap pembelian
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Games Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            🎮 Games Populer
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Top-up untuk game favorit kamu dengan harga terbaik
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Mobile Legends', category: 'MOBA', emoji: '⚔️' },
                            { name: 'PUBG Mobile', category: 'Battle Royale', emoji: '🔫' },
                            { name: 'Free Fire', category: 'Battle Royale', emoji: '🔥' },
                            { name: 'Genshin Impact', category: 'RPG', emoji: '✨' },
                        ].map((game, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <span className="text-2xl">{game.emoji}</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{game.name}</h3>
                                        <p className="text-sm text-gray-500">{game.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link href="/games">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                                🎯 Lihat Semua Games
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        🚀 Siap untuk Bermain?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Bergabung dengan ribuan gamers yang sudah mempercayai GameTopUp Pro untuk kebutuhan top-up mereka
                    </p>
                    
                    {!auth.user && (
                        <Link href="/register">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4">
                                ✨ Daftar Sekarang - Gratis!
                            </Button>
                        </Link>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">🎮</span>
                            </div>
                            <span className="text-xl font-bold">GameTopUp Pro</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Platform top-up game terpercaya di Indonesia
                        </p>
                        <div className="flex justify-center space-x-6 text-sm text-gray-400">
                            <span>© 2024 GameTopUp Pro</span>
                            <span>•</span>
                            <span>Dibuat dengan ❤️ untuk gamers Indonesia</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}