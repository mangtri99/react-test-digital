import { UserEditSchema, UserShema } from '@/schema/UserSchema';
import  { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useFetch from './useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  isEdit: boolean
}

function useUserFormState(props: Props) {
  const { isEdit } = props
  const [loading, setLoading] = useState(false)
  const defaultUser = {
    name: '',
    email: '',
    password: '',
  }

  const { $fetch } = useFetch()
  const params = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const IForm = isEdit ? UserEditSchema : UserShema;
  
  const form = useForm<z.infer<typeof IForm>>({
    resolver: zodResolver(IForm),
    defaultValues: defaultUser,
  });

  useEffect(() => {
    if (isEdit) {
      // fetch user data
      const fetchUser = async () => {
        try {
          const res = await $fetch(`/user/${params.id}`, {
            method: 'GET',
          })
          form.reset(res.data.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(err.response.data.message)
        }
      }
      fetchUser()      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof IForm>) {
    let method = 'POST'
    let url = '/user'
    if (isEdit) {
      method = 'PUT'
      url = `/user/${params.id}`
    }
    setLoading(true)
    await $fetch(url, {
      method,
      data: values
    }).then(() => {
      let msg = 'User created successfully'
      if(isEdit) {
        msg = 'User updated successfully'
      }
      toast({
        title: "Success",
        description: msg,
      })
      navigate('/')
    }).catch((err) => {
      console.log(err.response.data.message)
      toast({
        title: "Error",
        description: err.response.data.message,
        variant: 'destructive'
      })
      if(err.response?.data?.errors?.email && err.response?.data?.errors?.email[0]){
        form.setError('email', {
          type: 'manual',
          message: err.response.data.errors.email[0]
        })
      }
    }).finally(() => {
      setLoading(false)
    })
  }
  
  return {
    loading,
    form,
    onSubmit,
  }
}

export default useUserFormState
