/// <reference path="index.d.ts"/>

declare module 'terminate/promise' {
  import type { TerminateOptions } from 'terminate'

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @throws {Error} - if something went wrong.
   */
  export default function terminate(pid: number): Promise<void>;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param signal - the signal to kill the processes with. Defaults to `"SIGKILL"`
   * if it's empty or not defined.
   * @param opts - options object.
   * @throws {Error} - if something went wrong.
   */
  export default function terminate(pid: number, signal?: string, opts?: TerminateOptions): Promise<void>;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param signal - the signal to kill the processes with. Defaults to `"SIGKILL"`
   * if it's empty or not defined.
   * @param opts - options object.
   * @throws {Error} - if something went wrong.
   */
  export default function terminate(pid: number, signal: string, opts?: TerminateOptions): Promise<void>;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param opts - options object.
   * @throws {Error} - if something went wrong.
   */
  export default function terminate(pid: number, opts: TerminateOptions): Promise<void>;
}
