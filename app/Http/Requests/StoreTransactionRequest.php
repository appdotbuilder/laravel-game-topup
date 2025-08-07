<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'game_item_id' => 'required|exists:game_items,id',
            'player_id' => 'required|string|max:50',
            'payment_method' => 'required|in:ewallet,virtual_account,bank_transfer',
            'payment_channel' => 'required|string|max:50',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'game_item_id.required' => 'Please select a game item.',
            'game_item_id.exists' => 'The selected game item is invalid.',
            'player_id.required' => 'Player ID is required.',
            'player_id.max' => 'Player ID must not exceed 50 characters.',
            'payment_method.required' => 'Please select a payment method.',
            'payment_method.in' => 'Invalid payment method selected.',
            'payment_channel.required' => 'Please select a payment channel.',
        ];
    }
}