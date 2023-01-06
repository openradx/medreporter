import { NumberField } from "~/components/fields/NumberField"
import { Description } from "~/components/sr/Description"
import { Grid } from "~/components/sr/Grid"
import { GridGroup } from "~/components/sr/GridGroup"
import { GridItem } from "~/components/sr/GridItem"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"

export const KidneyVolumeStructure = () => {
  const { t } = useStructureTranslation()

  return (
    <Grid>
      <GridItem size="lg">
        <Description>{t("KidneyVolume.toolDescription")}</Description>
      </GridItem>
      <GridGroup label={t("KidneyVolume.right")}>
        <GridItem size="md">
          <NumberField id="rightCoronal" label={t("KidneyVolume.coronal")} precision={2} />
        </GridItem>
        <GridItem size="md">
          <NumberField id="rightSagittal" label={t("KidneyVolume.sagittal")} precision={2} />
        </GridItem>
        <GridItem size="md">
          <NumberField id="rightWidth" label={t("KidneyVolume.width")} precision={2} />
        </GridItem>
        <GridItem size="md">
          <NumberField id="rightDepth" label={t("KidneyVolume.depth")} precision={2} />
        </GridItem>
      </GridGroup>
      <GridGroup label={t("KidneyVolume.left")}>
        <GridItem size="md">
          <NumberField id="leftCoronal" label={t("KidneyVolume.coronal")} precision={2} />
        </GridItem>
        <GridItem size="md">
          <NumberField id="leftSagittal" label={t("KidneyVolume.sagittal")} precision={2} />
        </GridItem>
        <GridItem size="md">
          <NumberField id="leftWidth" label={t("KidneyVolume.width")} precision={2} />
        </GridItem>
        <GridItem size="md">
          <NumberField id="leftDepth" label={t("KidneyVolume.depth")} precision={2} />
        </GridItem>
      </GridGroup>
      <GridGroup label={t("KidneyVolume.patient")}>
        <GridItem size="md">
          <NumberField id="patientHeight" label={t("KidneyVolume.patientHeight")} precision={2} />
        </GridItem>
        <GridItem size="md">
          <NumberField id="patientAge" label={t("KidneyVolume.patientAge")} />
        </GridItem>
      </GridGroup>
    </Grid>
  )
}
