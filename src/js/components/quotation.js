const quotation = () => {
    return `
    <div class="modal">
        <h1 class="section-title">Request Quotation</h1>
        <form id="quotation-form" class="form">
            <!-- <p class="desc">Fields marked <span>*</span> are required.</p> -->
            <br>
            <div class="form-group">
                <label for="name">Full name<span>*</span></label>
                <input id="name" type="text" name="name">
            </div>
            <div class="form-group">
                <label for="email">Email<span>*</span></label>
                <input id="email" type="email" name="email">
            </div>
            <div class="form-group">
                <label for="phone">Phone (optional)</label>
                <input id="phone" type="number" name="phone">
            </div>
            <div class="form-group">
                <label for="service">Pick a service<span>*</span></label>
                <select id="service" name="service">
                    <option value="1">Porta Cabin</option>
                    <option value="2">Structural Design</option>
                    <option value="3">Architectural Design</option>
                    <option value="4">General Civil Engineering</option>
                    <option value="5">Electrical Services</option>
                    <option value="6">Solar Power Installation</option>
                    <option value="7">Material Sourcing and Supply</option>
                    <option value="8">Find Material Estimate</option>
                    <option value="9">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="project-description">Describe your project<span>*</span></label>
                <textarea id="project-description" row="300" name="project-description"></textarea>
            </div>

            <input type="submit" class="btn btn-shadow btn-full-width">
        </form>
    </div>`;
};

export default quotation;