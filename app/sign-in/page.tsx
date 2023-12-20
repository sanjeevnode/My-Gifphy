import AuthForm from "@/components/AuthForm";

const page = () => {
  return (
    <div className="flex  w-full items-center justify-center min-h-screen py-2 bg-background">
      <AuthForm mode="signin" />
    </div>
  );
};

export default page;
