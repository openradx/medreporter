import { ReactElement } from "react"
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle"
import { Welcome } from "../components/Welcome/Welcome"
import { MainLayout } from "../components/common/MainLayout"

const HomePage = () => (
  <>
    <Welcome />
    <ColorSchemeToggle />
  </>
)

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>

export default HomePage
