"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export const ClientForm: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter()
  const [zipCode, setZipCode] = useState(''); // State to manage the input value

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value); // Update zipCode state with input value
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/weather/${zipCode}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2 min-[400px]:flex-row]">
      <Input className="w-full" placeholder="Enter your ZIP code" onChange={handleInputChange} />
      <Button asChild className="max-w-xs space-x-2">
        <Link href={`/weather/${zipCode}`}>{children}</Link>
      </Button>
    </form>
  )
}