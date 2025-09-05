import { useState } from "react"
import { Head, useForm } from "@inertiajs/react"
import { Card } from "@/components/ui/card"
import { TextField } from "@/components/ui/text-field"
import { Button } from "@/components/ui/button"
import AuthenticatedLayout from "@/layouts/authenticated-layout"
import SettingsLayout from "@/pages/settings/settings-layout"
import { Modal } from "@/components/ui/modal"
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController"
import DeleteAccountController from "@/actions/App/Http/Controllers/Settings/DeleteAccountController"
const title = "Delete Account"
export default function DeleteAccount() {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  })

  const deleteUser = () => {
    destroy(DeleteAccountController.destroy().url, {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    })
  }

  const closeModal = () => {
    setConfirmingUserDeletion(false)
    reset()
  }

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Description className="max-w-lg">
            Once your account is deleted, all of its resources and data will be permanently deleted.
            Before deleting your account, please download any data or information that you wish to
            retain.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Modal onOpenChange={setConfirmingUserDeletion} isOpen={confirmingUserDeletion}>
            <Button onPress={() => setConfirmingUserDeletion(true)} intent="danger">
              Delete Account
            </Button>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Delete Account</Modal.Title>
                <Modal.Description>
                  Are you sure you want to delete your account? Once your account is deleted, all of
                  its resources and data will be permanently deleted. Please enter your password to
                  confirm you would like to permanently delete your account.
                </Modal.Description>
              </Modal.Header>

              <Modal.Body>
                <TextField
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(v) => setData("password", v)}
                  errorMessage={errors.password}
                  isRequired
                />
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close>Cancel</Modal.Close>
                <Button intent="danger" type="submit" onPress={deleteUser} isDisabled={processing}>
                  Continue
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    </>
  )
}

DeleteAccount.layout = (page: any) => (
  <AuthenticatedLayout title="Delete Account">
    <SettingsLayout children={page} />
  </AuthenticatedLayout>
)
