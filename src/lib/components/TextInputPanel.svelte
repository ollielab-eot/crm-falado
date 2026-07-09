<script lang="ts">
	let {
		text = $bindable(''),
		onGenerate,
		onClear
	} = $props<{
		text: string;
		onGenerate: () => void;
		onClear: () => void;
	}>();

	let isEmpty = $derived(text.trim().length === 0);
</script>

<section class="input-panel" aria-labelledby="input-title">
	<div>
		<p class="eyebrow">Entrada por texto</p>
		<h2 id="input-title">Cole a conversa</h2>
		<p class="hint">Use notas, transcrições ou resumos comerciais. Nesta sprint, a extração é mockada localmente.</p>
	</div>

	<label>
		<span>Nota comercial</span>
		<textarea
			bind:value={text}
			placeholder="Ex.: Ontem conversei com Alexandre Barbosa, diretor de tecnologia da Dimensa..."
			rows="12"
		></textarea>
	</label>

	<div class="actions">
		<button class="primary" type="button" disabled={isEmpty} onclick={onGenerate}>Gerar preview do card</button>
		<button class="secondary" type="button" onclick={onClear}>Limpar</button>
	</div>
</section>

<style>
	.input-panel {
		display: grid;
		gap: 1.25rem;
		border: 1px solid rgba(74, 93, 142, 0.16);
		border-radius: 1.75rem;
		padding: clamp(1rem, 3vw, 1.5rem);
		background: rgba(255, 255, 255, 0.78);
		box-shadow: 0 24px 70px rgba(32, 45, 84, 0.12);
	}

	.eyebrow {
		margin: 0 0 0.45rem;
		font-size: 0.78rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #4c63f2;
	}

	h2,
	.hint {
		margin: 0;
	}

	h2 {
		font-size: clamp(1.6rem, 4vw, 2.15rem);
		letter-spacing: -0.04em;
	}

	.hint {
		margin-top: 0.45rem;
		line-height: 1.6;
		color: #4b5b78;
	}

	label {
		display: grid;
		gap: 0.5rem;
		font-weight: 900;
		color: #22325f;
	}

	textarea {
		width: 100%;
		min-height: 280px;
		resize: vertical;
		border: 1px solid rgba(74, 93, 142, 0.25);
		border-radius: 1.15rem;
		padding: 1rem;
		background: #fff;
		font: inherit;
		line-height: 1.6;
		color: #14213d;
	}

	textarea:focus {
		outline: 3px solid rgba(76, 99, 242, 0.2);
		border-color: rgba(76, 99, 242, 0.55);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	button {
		border: 0;
		border-radius: 999px;
		padding: 0.85rem 1.1rem;
		font: inherit;
		font-weight: 900;
		cursor: pointer;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}

	.primary {
		background: #22325f;
		color: #fff;
		box-shadow: 0 14px 30px rgba(32, 45, 84, 0.18);
	}

	.secondary {
		background: #e8eefc;
		color: #22325f;
	}
</style>
