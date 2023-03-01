import { useRouter } from "next/router"
import { useAuthenticatedUser } from "~/hooks/useAuthenticatedUser"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { trpc } from "~/utils/trpc"
import { NewResourceForm } from "../resources/NewResourceForm"

export const NewModuleForm = () => {
  const { t } = useSiteTranslation()
  const user = useAuthenticatedUser()
  const router = useRouter()

  const createResource = trpc.resources.createResource.useMutation()
  const fetchOwnResource = trpc.resources.fetchOwnResource.useMutation()

  return (
    <NewResourceForm
      resourceType="MODULE"
      formTitle={t("NewModuleForm.formTitle")}
      onCheckDuplicate={async (name) =>
        Boolean(await fetchOwnResource.mutateAsync({ type: "MODULE", name }))
      }
      onSubmit={async (values) => {
        const createdModule = await createResource.mutateAsync(values)
        router.push({
          pathname: "/modules/[username]/[moduleName]/edit",
          query: { username: user.username, moduleName: createdModule.name },
        })
      }}
    />
  )
}
