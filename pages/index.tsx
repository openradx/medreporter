import { ReactElement } from "react"
import { Welcome } from "../components/Welcome/Welcome"
import { MainLayout } from "../components/common/MainLayout"

const HomePage = () => <Welcome />

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default HomePage
