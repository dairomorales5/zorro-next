'use client'
// Página del login
import {Input, Button} from "@nextui-org/react";
//
import { useRouter } from 'next/navigation';


export default function Login() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/calificar?profesor=Pedro%20Caro&materia=Historia');
  }
  return <>
    <h1>Accede a calificar a tus profesores</h1>
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <Input type="email" placeholder="Email" variant="underlined" />
      <Input type="password" placeholder="Password" variant="underlined" />
      <Button type="submit" variant="bordered" color="primary">Log in</Button>  
    </form>
  </>
}