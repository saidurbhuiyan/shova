import { useEffect } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import DateSelector from '@/Components/DateSelector';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone_number: '',
        email: '',
        gender: '',
        date_of_birth: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <AuthLayout auth={auth}>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>


                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <TextInput
                        id="phone_number"
                        type="number"
                        name="phone_number"
                        value={data.phone_number}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="mt-1 block w-full"
                        autoComplete="phone_number"
                        onChange={(e) => setData('phone_number', e.target.value)}
                        required
                    />

                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div className="mt-4 grid grid-cols-7 gap-2">
                    <div className="col-span-5">
                        <InputLabel htmlFor="date_of_birth" value="Birth Date" />

                        <DateSelector value={data.date_of_birth} onChange={(value) => setData('date_of_birth', value)} />

                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>


                    <div className="col-span-2">
                        <InputLabel htmlFor="gender" value="Gender" />

                        <SelectInput id="gender"
                            name="gender"
                            optionsData={{ male: 'Male', female: 'Female' }}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('gender', e.target.value)}
                            value={data.gender} />

                        <InputError message={errors.gender} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
