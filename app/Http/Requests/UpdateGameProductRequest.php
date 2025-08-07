<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGameProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Add admin authorization logic here
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('game_products', 'name')->ignore($this->route('gameProduct')->id)
            ],
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon_url' => 'nullable|url|max:500',
            'is_active' => 'boolean',
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
            'name.required' => 'Game name is required.',
            'name.unique' => 'A game with this name already exists.',
            'category.required' => 'Game category is required.',
            'icon_url.url' => 'Icon URL must be a valid URL.',
        ];
    }
}