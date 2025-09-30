#!@gjs@ -m

import Gettext from "gettext"
import GLib from "gi://GLib?version=2.0"
import { exit, programArgs, programInvocationName } from "system"

const localedir = GLib.build_filenamev([import.meta.datadir, "locale"])
Gettext.bindtextdomain(import.meta.domain, localedir)
Gettext.textdomain(import.meta.domain)

const { App } = await import("../src/App")
const exitCode = await new App().runAsync([
  programInvocationName, ...programArgs])

exit(exitCode)
