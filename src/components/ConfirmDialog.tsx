type Props={open:boolean;title:string;message:string;confirmLabel:string;cancelLabel?:string;onConfirm:()=>void;onCancel:()=>void};
export default function ConfirmDialog({open,title,message,confirmLabel,cancelLabel='I need to review',onConfirm,onCancel}:Props){
  if(!open)return null;
  return <div className="modal-backdrop" role="presentation"><section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><button className="modal-x" onClick={onCancel} aria-label="Close">×</button><h2 id="confirm-title">{title}</h2><p>{message}</p><div className="confirm-actions"><button className="ghost" onClick={onCancel}>← {cancelLabel}</button><button className="primary" onClick={onConfirm}>{confirmLabel} →</button></div></section></div>
}
