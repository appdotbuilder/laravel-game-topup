import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface GameProduct {
    name: string;
    category: string;
}

interface GameItem {
    name: string;
    currency_type: string;
    game_product: GameProduct;
}

interface Transaction {
    id: number;
    order_number: string;
    amount: string;
    status: string;
    payment_method: string;
    payment_channel: string;
    player_id: string;
    created_at: string;
    completed_at?: string;
    game_item: GameItem;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface Transactions {
    data: Transaction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    transactions: Transactions;
    [key: string]: unknown;
}

export default function TransactionsIndex({ transactions }: Props) {
    const getStatusEmoji = (status: string) => {
        switch (status) {
            case 'completed': return '✅';
            case 'pending': return '⏳';
            case 'processing': return '🔄';
            case 'failed': return '❌';
            case 'cancelled': return '🚫';
            default: return '⏳';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'failed': return 'bg-red-100 text-red-800';
            case 'cancelled': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCurrencyEmoji = (currencyType: string) => {
        switch (currencyType) {
            case 'diamond': return '💎';
            case 'uc': return '🪙';
            case 'crystal': return '✨';
            default: return '💰';
        }
    };

    const formatPrice = (amount: string) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(parseFloat(amount));
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const getPaymentMethodEmoji = (method: string) => {
        switch (method) {
            case 'ewallet': return '📱';
            case 'virtual_account': return '🏦';
            case 'bank_transfer': return '💰';
            default: return '💳';
        }
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            📜 Riwayat Transaksi
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Kelola dan pantau semua transaksi top-up kamu
                        </p>
                    </div>
                    
                    <Link href="/games">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            🎮 Top-Up Lagi
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Sukses</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {transactions.data.filter(t => t.status === 'completed').length}
                                </p>
                            </div>
                            <div className="text-2xl">✅</div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {transactions.data.filter(t => t.status === 'pending').length}
                                </p>
                            </div>
                            <div className="text-2xl">⏳</div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {transactions.total}
                                </p>
                            </div>
                            <div className="text-2xl">📊</div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Belanja</p>
                                <p className="text-lg font-bold text-purple-600">
                                    {formatPrice(
                                        transactions.data
                                            .filter(t => t.status === 'completed')
                                            .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                                            .toString()
                                    )}
                                </p>
                            </div>
                            <div className="text-2xl">💰</div>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            📋 Daftar Transaksi
                        </h2>
                    </div>
                    
                    {transactions.data.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {transactions.data.map((transaction) => (
                                <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            {/* Transaction Header */}
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-2xl">
                                                        {getCurrencyEmoji(transaction.game_item.currency_type)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {transaction.game_item.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {transaction.game_item.game_product.name} • Player ID: {transaction.player_id}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-blue-600">
                                                        {formatPrice(transaction.amount)}
                                                    </div>
                                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                        {getStatusEmoji(transaction.status)} {transaction.status.toUpperCase()}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Transaction Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <span className="font-medium text-gray-900 mr-2">Order:</span>
                                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                                                        {transaction.order_number}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center text-gray-600">
                                                    <span className="font-medium text-gray-900 mr-2">Pembayaran:</span>
                                                    {getPaymentMethodEmoji(transaction.payment_method)} {transaction.payment_channel}
                                                </div>
                                                
                                                <div className="flex items-center text-gray-600">
                                                    <span className="font-medium text-gray-900 mr-2">Tanggal:</span>
                                                    <span>{formatDate(transaction.created_at)}</span>
                                                </div>
                                            </div>

                                            {/* Completion Date */}
                                            {transaction.completed_at && (
                                                <div className="mt-2 text-sm text-green-600">
                                                    ✅ Selesai pada: {formatDate(transaction.completed_at)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <div className="ml-6">
                                            <Link href={`/transactions/${transaction.id}`}>
                                                <Button variant="outline" size="sm">
                                                    📄 Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-16 text-center">
                            <div className="text-6xl mb-4">🎮</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Belum ada transaksi
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Mulai top-up game favoritmu sekarang juga!
                            </p>
                            <Link href="/games">
                                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                    🚀 Mulai Top-Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {transactions.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {transactions.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    link.active
                                        ? 'bg-blue-500 text-white'
                                        : link.url
                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                preserveState
                                preserveScroll
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}