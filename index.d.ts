declare module 'terminate' {
  interface TerminateOptions {
    /**
     * Interval to poll whether `pid` and all of the childs pids have been killed.
     * @default 500
     */
    pollInterval?: number;

    /**
     * Max time (in milliseconds) to wait for process to exit before timing out
     * and calling back with an error.
     * @default 5000
     */
    timeout?: number;
  }

  /**
   * Error-first callback called when everything is successfully done.
   */
  interface DoneCallback {
    /**
     * @param error - will be `null` if no error occured.
     */
    (error: Error | null): void;
  }

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   */
  export default function terminate(pid: number): void;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param signal - the signal to kill the processes with. Defaults to `"SIGKILL"`
   * if it's empty or not defined.
   */
  export default function terminate(pid: number, signal: string): void;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param signal - the signal to kill the processes with. Defaults to `"SIGKILL"`
   * if it's empty or not defined.
   * @param opts - options object.
   */
  export default function terminate(pid: number, signal: string, opts: TerminateOptions): void;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param signal - the signal to kill the processes with. Defaults to `"SIGKILL"`
   * if it's empty or not defined.
   * @param opts - options object.
   * @param callback - if you want to know once the procesess have been terminated,
   * supply a callback.
   */
  export default function terminate(pid: number, signal?: string, opts?: TerminateOptions, callback?: DoneCallback): void;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param signal - the signal to kill the processes with. Defaults to `"SIGKILL"`
   * if it's empty or not defined.
   * @param callback - if you want to know once the procesess have been terminated,
   * supply a callback.
   */
  export default function terminate(pid: number, signal: string, callback: DoneCallback): void;
  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param signal - the signal to kill the processes with. Defaults to `"SIGKILL"`
   * if it's empty or not defined.
   * @param opts - options object.
   * @param callback - if you want to know once the procesess have been terminated,
   * supply a callback.
   */
  export default function terminate(pid: number, signal: string, opts: TerminateOptions, callback: DoneCallback): void;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param opts - options object.
   */
  export default function terminate(pid: number, opts: TerminateOptions): void;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param callback - if you want to know once the procesess have been terminated,
   * supply a callback.
   */
  export default function terminate(pid: number, opts: TerminateOptions, callback: DoneCallback): void;

  /**
   * `terminate` is an ultra-simple way to kill all the node processes
   * by providing a process pid. It finds all child processes and shuts
   * them down too, so you don't have to worry about lingering processes.
   *
   * @param pid - the Process ID you want to terminate.
   * @param callback - if you want to know once the procesess have been terminated,
   * supply a callback.
   */
  export default function terminate(pid: number, callback: DoneCallback): void;
}
