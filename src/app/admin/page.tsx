"use client"
import { api } from '@/lib/fetch'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
type formInputs = {
    username: string,
    acess_code: string
}
export default function AdminForm() {
    const { push } = useRouter()
    const { register, handleSubmit } = useForm<formInputs>()
    const onSubmit = (data: formInputs) => {
        api.post('/admin/', data).then((res) => {
            alert(res.data)
            push('/admin/dashboard')
        }).catch(err => {
            if (err.response.data) alert(err.response.data)
            console.log(err)
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=' w-8/12 mx-auto mt-6'>
            <h4>Acesso de administrador</h4>
            <label>Nome de usuário</label>
            <input className='input' {...register("username")} /> 
            <label>Código de acesso</label>
            <input className='input' {...register("acess_code")} />
            <input type='submit'/> 
        </form>
    )
}