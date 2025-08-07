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
    external_transaction_id?: string;
    game_item: GameItem;
    payment_details?: {
        channel: string;
        account_number?: string;
        player_id: string;
    };
}

interface Props {
    transaction: Transaction;
    [key: string]: unknown;
}

export default function TransactionShow({ transaction }: Props) {
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
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'failed': return 'bg-red-100 text-red-800 border-red-200';
            case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
            minute: '2-digit',
            timeZoneName: 'short'
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

    const getPaymentMethodName = (method: string) => {
        switch (method) {
            case 'ewallet': return 'E-Wallet';
            case 'virtual_account': return 'Virtual Account';
            case 'bank_transfer': return 'Bank Transfer';
            default: return method;
        }
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500">
                    <Link href="/transactions" className="hover:text-gray-700">Transaksi</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{transaction.order_number}</span>
                </div>

                {/* Header */}
                <div className="text-center">
                    <div className="text-6xl mb-4">
                        {getStatusEmoji(transaction.status)}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Detail Transaksi
                    </h1>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold border ${getStatusColor(transaction.status)}`}>
                        {getStatusEmoji(transaction.status)} {transaction.status.toUpperCase()}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                📦 Informasi Pesanan
                            </h2>
                            
                            <div className="space-y-4">
                                {/* Game Item */}
                                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <div className="text-3xl mr-4">
                                        {getCurrencyEmoji(transaction.game_item.currency_type)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">
                                            {transaction.game_item.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {transaction.game_item.game_product.name} • {transaction.game_item.game_product.category}
                                        </p>
                                        <p className="text-sm text-blue-600 font-medium mt-1">
                                            Player ID: {transaction.player_id}
                                        </p>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {formatPrice(transaction.amount)}
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm text-gray-500">Nomor Pesanan:</span>
                                            <div className="font-mono bg-gray-100 px-3 py-2 rounded text-sm font-medium">
                                                {transaction.order_number}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <span className="text-sm text-gray-500">Tanggal Pesanan:</span>
                                            <div className="font-medium text-gray-900">
                                                {formatDate(transaction.created_at)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm text-gray-500">Metode Pembayaran:</span>
                                            <div className="flex items-center font-medium text-gray-900">
                                                {getPaymentMethodEmoji(transaction.payment_method)}
                                                <span className="ml-2">
                                                    {transaction.payment_channel} ({getPaymentMethodName(transaction.payment_method)})
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {transaction.completed_at && (
                                            <div>
                                                <span className="text-sm text-gray-500">Tanggal Selesai:</span>
                                                <div className="font-medium text-green-600">
                                                    {formatDate(transaction.completed_at)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                💳 Informasi Pembayaran
                            </h2>
                            
                            <div className="space-y-4">
                                {/* Payment Status */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center">
                                        <div className="text-2xl mr-3">
                                            {getPaymentMethodEmoji(transaction.payment_method)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                {transaction.payment_channel}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {getPaymentMethodName(transaction.payment_method)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                                        {getStatusEmoji(transaction.status)} {transaction.status.toUpperCase()}
                                    </div>
                                </div>

                                {/* Payment Details */}
                                {transaction.payment_details && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                        {transaction.external_transaction_id && (
                                            <div>
                                                <span className="text-sm text-gray-500">Transaction ID:</span>
                                                <div className="font-mono bg-gray-100 px-3 py-2 rounded text-sm">
                                                    {transaction.external_transaction_id}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {transaction.payment_details.account_number && (
                                            <div>
                                                <span className="text-sm text-gray-500">Account Number:</span>
                                                <div className="font-mono bg-gray-100 px-3 py-2 rounded text-sm">
                                                    {transaction.payment_details.account_number}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                📈 Timeline Status
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        1
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="font-medium text-gray-900">Pesanan Dibuat</div>
                                        <div className="text-sm text-gray-500">{formatDate(transaction.created_at)}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        ['processing', 'completed'].includes(transaction.status) 
                                            ? 'bg-yellow-500 text-white' 
                                            : 'bg-gray-300 text-gray-600'
                                    }`}>
                                        2
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="font-medium text-gray-900">Pembayaran Diproses</div>
                                        <div className="text-sm text-gray-500">
                                            {['processing', 'completed'].includes(transaction.status) 
                                                ? 'Sedang diproses...' 
                                                : 'Menunggu pembayaran'
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        transaction.status === 'completed' 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-gray-300 text-gray-600'
                                    }`}>
                                        ✓
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="font-medium text-gray-900">Selesai</div>
                                        <div className="text-sm text-gray-500">
                                            {transaction.completed_at 
                                                ? formatDate(transaction.completed_at)
                                                : 'Belum selesai'
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                ⚡ Aksi Cepat
                            </h3>
                            
                            <div className="space-y-3">
                                <Link href="/games" className="block">
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                        🎮 Top-Up Lagi
                                    </Button>
                                </Link>
                                
                                <Link href="/transactions" className="block">
                                    <Button variant="outline" className="w-full">
                                        📜 Riwayat Transaksi
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                🆘 Butuh Bantuan?
                            </h3>
                            
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <span className="mr-2">📞</span>
                                    <span>Customer Service: 24/7</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="mr-2">💬</span>
                                    <span>Live Chat tersedia</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <span className="mr-2">📧</span>
                                    <span>Email: support@gametopup.pro</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Info */}
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                            <div className="flex items-center mb-3">
                                <div className="text-xl mr-2">🔐</div>
                                <h3 className="font-semibold text-green-800">Transaksi Aman</h3>
                            </div>
                            
                            <div className="space-y-2 text-sm text-green-700">
                                <div className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Enkripsi SSL 256-bit</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Data pribadi terlindungi</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Sistem pembayaran aman</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}