import { useSubmission } from "@solidjs/router";
import { Button } from "~/components/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/primitives/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/primitives/tabs";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/primitives/text-field";
import { authUser } from "~/lib/auth/actions";

const FormField = (props: {
  formType: "login" | "register";
  status?: boolean;
}) => {
  return (
    <>
      <input type="hidden" name="type" value={props.formType} />

      <CardContent class="space-y-2">
        <TextField class="space-y-1">
          <TextFieldLabel>e-mail</TextFieldLabel>
          <TextFieldInput name="email" value="steve@mine.craft" type="email" />
        </TextField>
        <TextField class="space-y-1">
          <TextFieldLabel>Password</TextFieldLabel>
          <TextFieldInput name="password" type="password" />
        </TextField>
      </CardContent>
      <CardFooter>
        <input type="hidden" name="redirectTo" value="/protected" />
        <Button
          type="submit"
          classList={{
            bounce: props.status,
            "cursor-not-allowed": props.status,
          }}
        >
          {props.formType[0].toLocaleUpperCase()}
          {props.formType.slice(1)}
        </Button>
      </CardFooter>
    </>
  );
};

export function Login() {
  const loggingIn = useSubmission(authUser);

  return (
    <Tabs defaultValue="login" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="login">login</TabsTrigger>
        <TabsTrigger value="register">register</TabsTrigger>
      </TabsList>
      <form action={authUser} method="post">
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Make changes to your login here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <FormField formType="login" status={loggingIn.pending} />
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <FormField formType="register" status={loggingIn.pending} />
          </Card>
        </TabsContent>
      </form>
    </Tabs>
  );
}
