import { ReactElement } from "react"
import { MainLayout } from "../components/common/MainLayout"
import { Welcome } from "../components/home/Welcome"
import { NextPageWithLayout } from "../types"

const HomePage: NextPageWithLayout = () => <Welcome />

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default HomePage
