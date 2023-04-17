import { useRouter } from "next/router";
import { useAuth,isLoaded, isSignedIn } from "@clerk/nextjs";
import ViewTask from "@/components/ViewTask";


export default function ToDoPage() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const {id} = router.query;
    if (!isLoaded) return <>Loading...</>;
    else if (isLoaded && !isSignedIn) router.push("/");
    else {
        return ( <ViewTask id={id}></ViewTask> )
    } 
}
