use swc_core::common::{FileName, GLOBALS, Mark, SourceMap};
use swc_core::common::errors::{ColorConfig, Handler};
use swc_core::common::sync::Lrc;
use swc_core::ecma::ast::Module;
use swc_core::ecma::parser::{EsConfig, lexer::Lexer, Parser, StringInput, Syntax};
use swc_core::ecma::transforms::base::resolver;
use swc_core::ecma::visit::VisitMutWith;

fn main() {
    let mut a = to_ast("a.js", "let a= 1;export {a as b}");

    GLOBALS.set(&Default::default(), || {
        let a_top = Mark::new();
        let a_unresolved = Mark::new();
        println!("a unresolved {:?}, a top {:?}", a_unresolved, a_top);
        a.visit_mut_with(&mut resolver(a_unresolved, a_top, false));

        println!("{:?}", &a.body[1]);
    });
}


fn to_ast(file_name: &str, content: &str) -> Module {
    let cm = Lrc::<SourceMap>::default();
    let sf = cm.new_source_file(
        FileName::Custom(file_name.into()),
        content.into(),
    );

    let handler = Handler::with_tty_emitter(
        ColorConfig::Auto,
        true,
        false,
        Some(cm.clone()),
    );

    let lexer = Lexer::new(
        Syntax::Es(EsConfig::default()),
        Default::default(),
        StringInput::from(&*sf),
        None,
    );

    let mut parser = Parser::new_from(lexer);

    for e in parser.take_errors() {
        e.into_diagnostic(&handler).emit();
    }


    let ast = parser.parse_module()
        .map_err(|e| e.into_diagnostic(&handler).emit())
        .unwrap();
    ast
}

