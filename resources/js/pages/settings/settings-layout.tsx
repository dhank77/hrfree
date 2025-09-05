import { composeTailwindRenderProps } from "@/lib/primitive"
import { Container } from "@/components/ui/container"
import { ListBox, ListBoxItem, type ListBoxItemProps } from "react-aria-components"
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController"
import PasswordController from "@/actions/App/Http/Controllers/Settings/PasswordController"
import AppearanceController from "@/actions/App/Http/Controllers/Settings/AppearanceController"
import DeleteAccountController from "@/actions/App/Http/Controllers/Settings/DeleteAccountController"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-6 sm:py-16">
      <div className="flex flex-col items-start gap-6 md:flex-row md:gap-16">
        <div className="w-full shrink-0 md:w-56">
          <ListBox aria-label="Menu" selectionMode="single">
            <NavLink href="/settings/profile" isCurrent={ProfileController.edit().url === window.location.pathname}>
              Profile
            </NavLink>
            <NavLink href="/settings/password" isCurrent={PasswordController.edit().url === window.location.pathname}>
              Change password
            </NavLink>
            <NavLink href="/settings/appearance" isCurrent={AppearanceController.url() === window.location.pathname}>
              Appearance
            </NavLink>
            <NavLink
              href="/settings/delete-account"
              isCurrent={DeleteAccountController.index().url === window.location.pathname}
            >
              Danger zone
            </NavLink>
          </ListBox>
        </div>
        <div className="w-full min-w-0">{children}</div>
      </div>
    </Container>
  )
}

interface NavLinkProps extends ListBoxItemProps {
  isCurrent?: boolean
}
export function NavLink({ isCurrent, className, ...props }: NavLinkProps) {
  return (
    <ListBoxItem
      textValue={props.children as string}
      className={composeTailwindRenderProps(className, [
        "block py-2 font-medium text-sm",
        isCurrent ? "font-semibold text-fg" : "text-muted-fg hover:text-fg",
      ])}
      {...props}
    />
  )
}
