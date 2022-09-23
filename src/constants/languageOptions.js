/* eslint-disable no-multi-str */
/* eslint-disable no-tabs */
export const languageOptions = [
  {
    id: 63,
    name: 'JavaScript (Node.js 12.14.0)',
    label: 'JavaScript (Node.js 12.14.0)',
    value: 'javascript',
    template: 'console.log("hello, world");'
  },
  {
    id: 45,
    name: 'Assembly (NASM 2.14.02)',
    label: 'Assembly (NASM 2.14.02)',
    value: 'assembly',
    template:
      "\
section	.text\n\
    global _start\n\
\n\
_start:\n\
\n\
    xor	eax, eax\n\
    lea	edx, [rax+len]\n\
    mov	al, 1\n\
    mov	esi, msg\n\
    mov	edi, eax\n\
    syscall\n\
\n\
    xor	edi, edi\n\
    lea	eax, [rdi+60]\n\
    syscall\n\
\n\
section	.rodata\n\
\n\
msg	db 'hello, world', 0xa\n\
len	equ	$ - msg\n"
  },
  {
    id: 46,
    name: 'Bash (5.0.0)',
    label: 'Bash (5.0.0)',
    value: 'bash',
    template: 'echo "hello, world"'
  },
  {
    id: 47,
    name: 'Basic (FBC 1.07.1)',
    label: 'Basic (FBC 1.07.1)',
    value: 'basic',
    template: 'PRINT "hello, world"'
  },
  {
    id: 75,
    name: 'C (Clang 7.0.1)',
    label: 'C (Clang 7.0.1)',
    value: 'c',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 76,
    name: 'C++ (Clang 7.0.1)',
    label: 'C++ (Clang 7.0.1)',
    value: 'cpp',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 48,
    name: 'C (GCC 7.4.0)',
    label: 'C (GCC 7.4.0)',
    value: 'c',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 52,
    name: 'C++ (GCC 7.4.0)',
    label: 'C++ (GCC 7.4.0)',
    value: 'cpp',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 49,
    name: 'C (GCC 8.3.0)',
    label: 'C (GCC 8.3.0)',
    value: 'c',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 53,
    name: 'C++ (GCC 8.3.0)',
    label: 'C++ (GCC 8.3.0)',
    value: 'cpp',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 50,
    name: 'C (GCC 9.2.0)',
    label: 'C (GCC 9.2.0)',
    value: 'c',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 54,
    name: 'C++ (GCC 9.2.0)',
    label: 'C++ (GCC 9.2.0)',
    value: 'cpp',
    template:
      '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 86,
    name: 'Clojure (1.10.1)',
    label: 'Clojure (1.10.1)',
    value: 'clojure',
    template: '(println "hello, world")\n'
  },
  {
    id: 51,
    name: 'C# (Mono 6.6.0.161)',
    label: 'C# (Mono 6.6.0.161)',
    value: 'csharp',
    template:
      '\
public class Hello {\n\
    public static void Main() {\n\
        System.Console.WriteLine("hello, world");\n\
    }\n\
}\n\
    '
  },
  {
    id: 77,
    name: 'COBOL (GnuCOBOL 2.2)',
    label: 'COBOL (GnuCOBOL 2.2)',
    value: 'cobol',
    template:
      '\
IDENTIFICATION DIVISION.\n\
PROGRAM-ID. MAIN.\n\
PROCEDURE DIVISION.\n\
DISPLAY "hello, world".\n\
STOP RUN.\n\
    '
  },
  {
    id: 55,
    name: 'Common Lisp (SBCL 2.0.0)',
    label: 'Common Lisp (SBCL 2.0.0)',
    value: 'lisp',
    template: '(write-line "hello, world")'
  },
  {
    id: 56,
    name: 'D (DMD 2.089.1)',
    label: 'D (DMD 2.089.1)',
    value: 'd',
    template:
      '\
import std.stdio;\n\
\n\
void main()\n\
{\n\
    writeln("hello, world");\n\
}\n\
    '
  },
  {
    id: 57,
    name: 'Elixir (1.9.4)',
    label: 'Elixir (1.9.4)',
    value: 'elixir',
    template: 'IO.puts "hello, world"'
  },
  {
    id: 58,
    name: 'Erlang (OTP 22.2)',
    label: 'Erlang (OTP 22.2)',
    value: 'erlang',
    template: '\
main(_) ->\n\
    io:fwrite("hello, world\\n").\n\
    '
  },
  {
    id: 44,
    label: 'Executable',
    name: 'Executable',
    value: 'exe',
    template:
      '\
Judge0 IDE assumes that content of executable is Base64 encoded.\n\
\n\
This means that you should Base64 encode content of your binary,\n\
paste it here and click "Run".\n\
\n\
Here is an example of compiled "hello, world" NASM program.\n\
Content of compiled binary is Base64 encoded and used as source code.\n\
\n\
https://ide.judge0.com/?kS_f\n\
    '
  },
  {
    id: 87,
    name: 'F# (.NET Core SDK 3.1.202)',
    label: 'F# (.NET Core SDK 3.1.202)',
    value: 'fsharp',
    template: 'printfn "hello, world"\n'
  },
  {
    id: 59,
    name: 'Fortran (GFortran 9.2.0)',
    label: 'Fortran (GFortran 9.2.0)',
    value: 'fortran',
    template: '\
program main\n\
    print *, "hello, world"\n\
end\n\
    '
  },
  {
    id: 60,
    name: 'Go (1.13.5)',
    label: 'Go (1.13.5)',
    value: 'go',
    template:
      '\
package main\n\
\n\
import "fmt"\n\
\n\
func main() {\n\
    fmt.Println("hello, world")\n\
}\n\
    '
  },
  {
    id: 88,
    name: 'Groovy (3.0.3)',
    label: 'Groovy (3.0.3)',
    value: 'groovy',
    template: 'println "hello, world"\n'
  },
  {
    id: 61,
    name: 'Haskell (GHC 8.8.1)',
    label: 'Haskell (GHC 8.8.1)',
    value: 'haskell',
    template: 'main = putStrLn "hello, world"'
  },
  {
    id: 62,
    name: 'Java (OpenJDK 13.0.1)',
    label: 'Java (OpenJDK 13.0.1)',
    value: 'java',
    template:
      '\
public class Main {\n\
    public static void main(String[] args) {\n\
        System.out.println("hello, world");\n\
    }\n\
}\n\
    '
  },

  {
    id: 78,
    name: 'Kotlin (1.3.70)',
    label: 'Kotlin (1.3.70)',
    value: 'kotlin',
    template: '\
fun main() {\n\
    println("hello, world")\n\
}\n\
    '
  },
  {
    id: 64,
    name: 'Lua (5.3.5)',
    label: 'Lua (5.3.5)',
    value: 'lua',
    template: 'print("hello, world")'
  },

  {
    id: 79,
    name: 'Objective-C (Clang 7.0.1)',
    label: 'Objective-C (Clang 7.0.1)',
    value: 'objectivec',
    template:
      '\
#import <Foundation/Foundation.h>\n\
\n\
int main() {\n\
    @autoreleasepool {\n\
        char name[10];\n\
        scanf("%s", name);\n\
        NSString *message = [NSString stringWithFormat:@"hello, %s\\n", name];\n\
        printf("%s", message.UTF8String);\n\
    }\n\
    return 0;\n\
}\n\
    '
  },
  {
    id: 65,
    name: 'OCaml (4.09.0)',
    label: 'OCaml (4.09.0)',
    value: 'ocaml',
    template: 'print_endline "hello, world"'
  },
  {
    id: 66,
    name: 'Octave (5.1.0)',
    label: 'Octave (5.1.0)',
    value: 'octave',
    template: 'printf("hello, world\\n");'
  },
  {
    id: 67,
    name: 'Pascal (FPC 3.0.4)',
    label: 'Pascal (FPC 3.0.4)',
    value: 'pascal',
    template:
      "\
program Hello;\n\
begin\n\
    writeln ('hello, world')\n\
end.\n\
    "
  },
  {
    id: 85,
    name: 'Perl (5.28.1)',
    label: 'Perl (5.28.1)',
    value: 'perl',
    template: '\
my $name = <STDIN>;\n\
print "hello, $name";\n\
    '
  },
  {
    id: 68,
    name: 'PHP (7.4.1)',
    label: 'PHP (7.4.1)',
    value: 'php',
    template: '\
<?php\n\
print("hello, world\\n");\n\
?>\n\
    '
  },
  {
    id: 43,
    label: 'Plain Text',
    name: 'Plain Text',
    value: 'text',
    template: 'hello, world\n'
  },
  {
    id: 69,
    name: 'Prolog (GNU Prolog 1.4.5)',
    label: 'Prolog (GNU Prolog 1.4.5)',
    value: 'prolog',
    template:
      "\
:- initialization(main).\n\
main :- write('hello, world\\n').\n\
    "
  },
  {
    id: 70,
    name: 'Python (2.7.17)',
    label: 'Python (2.7.17)',
    value: 'python',
    template: 'print("hello, world")'
  },
  {
    id: 71,
    name: 'Python (3.8.1)',
    label: 'Python (3.8.1)',
    value: 'python',
    template: 'print("hello, world")'
  },
  {
    id: 80,
    name: 'R (4.0.0)',
    label: 'R (4.0.0)',
    value: 'r',
    template: 'cat("hello, world\\n")'
  },
  {
    id: 72,
    name: 'Ruby (2.7.0)',
    label: 'Ruby (2.7.0)',
    value: 'ruby',
    template: 'puts "hello, world"'
  },
  {
    id: 73,
    name: 'Rust (1.40.0)',
    label: 'Rust (1.40.0)',
    value: 'rust',
    template: '\
fn main() {\n\
    println!("hello, world");\n\
}\n\
    '
  },
  {
    id: 81,
    name: 'Scala (2.13.2)',
    label: 'Scala (2.13.2)',
    value: 'scala',
    template:
      '\
object Main {\n\
    def main(args: Array[String]) = {\n\
        val name = scala.io.StdIn.readLine()\n\
        println("hello, "+ name)\n\
    }\n\
}\n\
    '
  },
  {
    id: 82,
    name: 'SQL (SQLite 3.27.2)',
    label: 'SQL (SQLite 3.27.2)',
    value: 'sql',
    template:
      '\
-- On Judge0 IDE your SQL script is run on chinook database (https://www.sqlitetutorial.net/sqlite-sample-database).\n\
-- For more information about how to use SQL with Judge0 API please\n\
-- watch this asciicast: https://asciinema.org/a/326975.\n\
SELECT\n\
    Name, COUNT(*) AS num_albums\n\
FROM artists JOIN albums\n\
ON albums.ArtistID = artists.ArtistID\n\
GROUP BY Name\n\
ORDER BY num_albums DESC\n\
LIMIT 4;\n\
    '
  },
  {
    id: 83,
    name: 'Swift (5.2.3)',
    label: 'Swift (5.2.3)',
    value: 'swift',
    template:
      '\
import Foundation\n\
let name = readLine()\n\
print("hello, \\(name!)")\n\
    '
  },
  {
    id: 74,
    name: 'TypeScript (3.7.4)',
    label: 'TypeScript (3.7.4)',
    value: 'typescript',
    template: 'console.log("hello, world");'
  },
  {
    id: 84,
    name: 'Visual Basic.Net (vbnc 0.0.0.5943)',
    label: 'Visual Basic.Net (vbnc 0.0.0.5943)',
    value: 'vbnet',
    template:
      '\
Public Module Program\n\
   Public Sub Main()\n\
      Console.WriteLine("hello, world")\n\
   End Sub\n\
End Module\n\
    '
  }
]
