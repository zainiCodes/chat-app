import { createFileRoute } from "@tanstack/react-router";
import loginPage from "@/features/auth/components/sign-in-form";
export const Route = createFileRoute("/")({
  component: loginPage,
  // component: fo,
});
// function fo() {
//   return (
//     <>
//       hello world
//       <Button>hello</Button>
//     </>
//   )
// }