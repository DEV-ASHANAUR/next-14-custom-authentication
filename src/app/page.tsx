import { redirect } from 'next/navigation';

const landingPage = () => {
  return redirect("/home");
}

export default landingPage
