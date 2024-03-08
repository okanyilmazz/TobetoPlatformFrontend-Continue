import '../ProfileDetail/ProfileDetail.css';

export default function MyComponent() {
    return (
        <div className="pgn-npt col-12 col-md-9">
            <div className="pswrd-row row mb-2">
                <div className="npt col-12 col-md-4 mb-6">
                    <label className="input-title">Eski Şifre*</label>
                    <input name="currentPassword" className='tbt-input' type="password" placeholder='Eski Şifre' />
                </div>
                <div className="npt col-12 col-md-4 mb-6">
                    <label className="input-title">Yeni Şifre*</label>
                    <input name="currentPassword" className='tbt-input' type="password" placeholder='Yeni Şifre' />
                </div>
                <div className="npt col-12 col-md-4 mb-6">
                    <label className="input-title">Yeni Şifre Tekrar*</label>
                    <input name="currentPassword" className='tbt-input' type="password" placeholder='Yeni Şifre Tekrar' />
                </div>
            </div>
            <div className='row-btn row'>
                <div className='col-12 col-md-6'>
                    <button className="btn btn-primary w-100">Şifre Değiştir
                    </button>
                </div>
                <div className='col-md-6 col-12'>
                    <button className="btn btn-danger mb-2 w-100">Üyeliği Sonlandır
                    </button>
                </div>
            </div>
        </div>
    );
}
