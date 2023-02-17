import { useRouter } from "next/router"
import { useAuthenticatedUser } from "~/hooks/useAuthenticatedUser"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { NewResourceForm } from "../resources/NewResourceForm"

export const NewFigureForm = () => {
  const { t } = useSiteTranslation()
  const user = useAuthenticatedUser()
  const router = useRouter()

  const createResource = trpc.resources.createNewResource.useMutation()
  const fetchOwnResource = trpc.resources.fetchOwnResource.useMutation()

  return (
    <NewResourceForm
      resourceType="FIGURE"
      formTitle={t("NewFigureForm.formTitle")}
      onCheckDuplicate={async (name) =>
        Boolean(await fetchOwnResource.mutateAsync({ type: "FIGURE", name }))
      }
      onSubmit={async (values) => {
        const createdFigure = await createResource.mutateAsync(values)
        router.push({
          pathname: "/figures/[username]/[figureName]/edit",
          query: { username: user.username, figureName: createdFigure.name },
        })
      }}
    />
  )
}
