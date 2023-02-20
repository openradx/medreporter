import { Button } from "@mantine/core"
import Link from "next/link"
import { Route } from "nextjs-routes"
import { MdAddCircleOutline as AddIcon } from "react-icons/md"

interface AddResourceButtonProps {
  route: Route
  label: string
}

export const AddResourceButton = ({ route, label }: AddResourceButtonProps) => (
  <Link href={route} passHref legacyBehavior>
    <Button variant="outline" component="a" color="green" leftIcon={<AddIcon size={16} />}>
      {label}
    </Button>
  </Link>
)
