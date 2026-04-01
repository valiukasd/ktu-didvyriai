import Image from "next/image";
import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          
          <FieldGroup>
          <FieldSet>
            <FieldLegend>Account registration</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="register_account_name">
                  Account Name
                </FieldLabel>
                <Input
                  id="register_account_name"
                  placeholder="Vardenis Pavardenis"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="register_email_address">
                  Email Address
                </FieldLabel>
                <Input
                  id="register_email_address"
                  placeholder="1234 5678 9012 3456"
                  required
                />                
              </Field>
              <Field>
                <FieldLabel htmlFor="register_password">
                  Password
                </FieldLabel>
                <Input
                  id="register_password"
                  placeholder="slaptažodis123"
                  required
                />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Month
                  </FieldLabel>                  
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Year
                  </FieldLabel>                  
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
        </div>
    </div>
  );
}
