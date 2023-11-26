import { Card, CardContent } from "@/components/ui/card";
import Title from "@/components/ui/title";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUserFormState from "@/composable/useUserFormState";

interface Props {
  isEdit: boolean;
}

function FormUser(props: Props) {
  const { isEdit } = props;
  const { form, onSubmit, loading } = useUserFormState({ isEdit });
  return (
    <>
      <div className="flex justify-center flex-col items-center w-full">
        <Title className="mb-6">{isEdit ? "Edit User" : "Create User"}</Title>
        <Card className="w-full md:w-2/3">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Your name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Your Password"
                        />
                      </FormControl>
                      {isEdit && (
                        <FormDescription>
                          Leave blank if you don't want to change the password
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default FormUser;
